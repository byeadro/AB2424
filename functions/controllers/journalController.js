import admin from 'firebase-admin'
if(!admin.apps.length) admin.initializeApp()
const db=admin.firestore(), auth=admin.auth()
async function getUid(req){ const token=req.headers.authorization?.replace('Bearer ',''); const d=await auth.verifyIdToken(token); return d.uid }
export async function getEntries(req,res){
  try{ const uid=await getUid(req)
    const snap=await db.collection('users').doc(uid).collection('entries').orderBy('createdAt','desc').get()
    res.json(snap.docs.map(d=>({id:d.id,...d.data()})))
  }catch(e){ res.status(401).json({error:e.message}) }
}
export async function createEntry(req,res){
  try{ const uid=await getUid(req)
    const ref=await db.collection('users').doc(uid).collection('entries').add({...req.body,createdAt:admin.firestore.FieldValue.serverTimestamp()})
    res.status(201).json({id:ref.id})
  }catch(e){ res.status(400).json({error:e.message})}
}
export async function updateEntry(req,res){
  try{ const uid=await getUid(req)
    await db.collection('users').doc(uid).collection('entries').doc(req.params.id).update(req.body)
    res.json({success:true})
  }catch(e){ res.status(400).json({error:e.message})}
}
export async function deleteEntry(req,res){
  try{ const uid=await getUid(req)
    await db.collection('users').doc(uid).collection('entries').doc(req.params.id).delete()
    res.json({success:true})
  }catch(e){ res.status(400).json({error:e.message})}
}
