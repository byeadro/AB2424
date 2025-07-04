import admin from 'firebase-admin'
if(!admin.apps.length) admin.initializeApp()
const auth=admin.auth()
export async function signup(req,res){
  const{email,password}=req.body
  try{
    const user=await auth.createUser({email,password})
    const token=await auth.createCustomToken(user.uid)
    res.status(201).json({token})
  }catch(e){ res.status(400).json({error:e.message}) }
}
export async function login(req,res){
  const{idToken}=req.body
  try{
    const decoded=await auth.verifyIdToken(idToken)
    const token=await auth.createCustomToken(decoded.uid)
    res.status(200).json({token})
  }catch(e){ res.status(401).json({error:e.message}) }
}
