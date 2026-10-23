import {env} from 'cloudflare:workers';
import {getDb} from '../../../db';
import {responses} from '../../../db/schema';
import {allQuestions,issues,visible,Answers} from '../../questions';
import {desc} from 'drizzle-orm';
export async function GET(req:Request){
 const key=(env as unknown as {ADMIN_KEY?:string}).ADMIN_KEY;
 if(!key||req.headers.get('authorization')!==`Bearer ${key}`)return Response.json({error:'Mã quản trị không đúng.'},{status:401});
 const rows=await getDb().select().from(responses).orderBy(desc(responses.createdAt)).limit(500);
 return Response.json(rows.map(r=>({...r,answers:JSON.parse(r.answers)})),{headers:{'Cache-Control':'no-store'}});
}
export async function POST(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Nguồn yêu cầu không hợp lệ.'},{status:403});
 const raw=await req.text();if(raw.length>80000)return Response.json({error:'Nội dung quá dài.'},{status:413});
 let body;try{body=JSON.parse(raw)}catch{return Response.json({error:'Dữ liệu không hợp lệ.'},{status:400})}
 if(!body.consent||typeof body.id!=='string'||!/^[-a-zA-Z0-9]{20,60}$/.test(body.id)||!body.answers||typeof body.answers!=='object')return Response.json({error:'Thiếu xác nhận hoặc mã phiếu.'},{status:400});
 const a:Answers={};
 for(const q of allQuestions){const v=body.answers[q.id];if(v!==undefined){if(q.type==='multi'){if(!Array.isArray(v)||v.some(x=>typeof x!=='string'||!q.options?.includes(x)))return Response.json({error:'Lựa chọn không hợp lệ.'},{status:400});a[q.id]=[...new Set(v)] as string[]}else{if(typeof v!=='string'||v.length>3000||q.options&&!q.options.includes(v))return Response.json({error:'Câu trả lời không hợp lệ.'},{status:400});a[q.id]=v.trim()}}const other=body.answers[q.id+'_other'];if(other!==undefined){if(typeof other!=='string'||other.length>3000)return Response.json({error:'Nội dung bổ sung quá dài.'},{status:400});a[q.id+'_other']=other.trim()}}
 if(issues(a).length)return Response.json({error:'Vui lòng hoàn thành các câu bắt buộc.',missing:issues(a)},{status:400});
 for(const q of allQuestions)if(!visible(q,a)){delete a[q.id];delete a[q.id+'_other']}
 await getDb().insert(responses).values({id:body.id,createdAt:new Date().toISOString(),answers:JSON.stringify(a)}).onConflictDoNothing();
 return Response.json({id:body.id},{status:201,headers:{'Cache-Control':'no-store'}});
}
