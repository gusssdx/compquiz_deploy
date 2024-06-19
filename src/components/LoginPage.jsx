import React, { useState } from 'react';
import axios from 'axios';

function Login({ onSignupClick, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Kirim permintaan login ke server
    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        // Jika login berhasil, panggil fungsi onLogin dari props
        onLogin();
      })
      .catch(error => {
        console.error('Login failed:', error);
        // Tampilkan pesan kesalahan jika login gagal
        alert('Login failed. Please check your email and password.');
      });

    // Tambahkan log untuk menampilkan data yang dikirim ke server
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleSignupClick = () => {
    onSignupClick();
  };

  return (
  <div className="bg-[url('/img/cg.jpg')]"> {/* path buat background */}
    <div className="flex justify-center items-center bg-primary min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg overflow-hidden">
        <h2 className="text-4xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-xl text-left font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-xl text-left font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter Password"
            />
          </div>
          <p className="text-xl mt-2">By logging in, you agree to our terms and policy</p>
          <button type="submit" className="bg-green-500 text-white font-medium text-lg py-2 px-4 rounded-md hover:bg-green-600 ml-11">Log in</button>
          <button type="button" className="border border-gray-300 mt-4 text-gray-700 font-medium text-lg py-2 px-4 rounded-md hover:bg-gray-50 ml-4" onClick={handleSignupClick}>Create Account</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Login;
