import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {auth} from '../firebaseConfig'
import {createUserWithEmailAndPassword} from 'firebase/auth'
export default function SignUp(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const navigate=useNavigate()
  const handleSubmit=async e=>{
    e.preventDefault(); setError(null)
    try{ await createUserWithEmailAndPassword(auth,email,password)
      navigate('/feed')
    }catch(err){ setError(err.message) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Create Account</h2>
        {error&&<p className="text-red-500 mb-4 text-center">{error}</p>}
        <label className="block mb-1">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded mb-4"/>
        <label className="block mb-1">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded mb-6"/>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Sign Up</button>
        <p className="mt-4 text-center">Already have an account? <button type="button" onClick={()=>navigate('/')} className="text-blue-600 hover:underline">Sign In</button></p>
      </form>
    </div>
  )
}
