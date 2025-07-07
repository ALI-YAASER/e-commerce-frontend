//
//
// /* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
//
// const Login = () => {
//   const [currentState, setCurrentState] = useState('Sign Up');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//
//   // const onSubmitHandler = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const url =
//   //       currentState === 'Sign In'
//   //         ? `${backendUrl}/api/user/login`
//   //         : `${backendUrl}/api/user/register`;
//   //
//   //     const payload =
//   //       currentState === 'Sign In'
//   //         ? { email, password }
//   //         : { name, email, password };
//   //
//   //     const response = await axios.post(url, payload);
//   //       console.log(response.data);
//   //     if (response.data.success) {
//   //       setToken(response.data.token);
//   //       localStorage.setItem('token', response.data.token);
//   //       toast.success(`${currentState === 'Sign Up' ? 'Registered' : 'Logged in'} successfully`);
//   //
//   //       // ✅ التنقل إلى الصفحة الرئيسية أو /list
//   //     } else {
//   //       toast.error(response.data.message);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || 'Something went wrong');
//   //   }
//   // };
//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//
//         // تحقق من الحقول قبل إرسال الطلب
//         if (currentState === 'Sign Up') {
//             if (!name || !email || !password) {
//                 toast.error('All fields are required');
//                 return;
//             }
//         } else {
//             if (!email || !password) {
//                 toast.error('Email and password are required');
//                 return;
//             }
//         }
//
//         try {
//             const url =
//                 currentState === 'Sign In'
//                     ? `${backendUrl}/api/user/login`
//                     : `${backendUrl}/api/user/register`;
//
//             const payload =
//                 currentState === 'Sign In'
//                     ? { email, password }
//                     : { name, email, password };
//
//             const response = await axios.post(url, payload);
//
//             if (response.data.success) {
//                 setToken(response.data.token);
//                 localStorage.setItem('token', response.data.token);
//                 toast.success(`${currentState === 'Sign Up' ? 'Registered' : 'Logged in'} successfully`);
//                 navigate('/');
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Something went wrong');
//         }
//     };
//
//
//     useEffect(()=>{
//     if(token){
//       navigate('/')
//     }
//   },[token])
//
//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="prata-regular text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-700" />
//       </div>
//
//       {currentState !== 'Login' && (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//           required
//         />
//       )}
//
//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//       />
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />
//
//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer text-blue-700">Forgot your password?</p>
//         <a
//           onClick={() =>
//             setCurrentState(currentState === 'Login' ? 'Sign up' : 'Login')
//           }
//           className="cursor-pointer text-blue-700"
//         >
//           {currentState === 'Login' ? 'Create account' : 'Login Here'}
//         </a>
//       </div>
//
//       <button className="bg-black text-white justify-between text-sm my-8 px-12 py-4 cursor-pointer">
//         {currentState === 'Sign up' ? 'Sign Up' : 'Sign In'}
//       </button>
//     </form>
//   );
// };
//
// export default Login;

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign In'); // ✅ موحد
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // ✅ التحقق من الحقول المطلوبة
        if (currentState === 'Sign Up') {
            if (!name || !email || !password) {
                toast.error('All fields are required');
                return;
            }
        } else {
            if (!email || !password) {
                toast.error('Email and password are required');
                return;
            }
        }

        try {
            const url =
                currentState === 'Sign In'
                    ? `${backendUrl}/api/user/login`
                    : `${backendUrl}/api/user/register`;

            const payload =
                currentState === 'Sign In'
                    ? { email, password }
                    : { name, email, password };

            const response = await axios.post(url, payload);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success(`${currentState === 'Sign Up' ? 'Registered' : 'Logged in'} successfully`);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-700" />
            </div>

            {/* ✅ حقل الاسم فقط في حالة التسجيل */}
            {currentState === 'Sign Up' && (
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Name"
                    required
                />
            )}

            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                required
            />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer text-blue-700">Forgot your password?</p>
                <a
                    onClick={() =>
                        setCurrentState(currentState === 'Sign In' ? 'Sign Up' : 'Sign In')
                    }
                    className="cursor-pointer text-blue-700"
                >
                    {currentState === 'Sign In' ? 'Create account' : 'Login Here'}
                </a>
            </div>

            <button className="bg-black text-white text-md my-8 px-12 py-4 cursor-pointer">
                {currentState === 'Sign Up' ? 'Sign Up' : 'Sign In'}
            </button>
        </form>
    );
};

export default Login;
