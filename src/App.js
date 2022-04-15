import React, {useState} from 'react';
import Customer from './modules/customer/Customer';
import UserLogin from './modules/user/UserLogin';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="">
      { isLogin == false && <UserLogin changeLoginStatus={(newStatus) => setIsLogin(newStatus)} />}
      { isLogin && 
        <div>
          <button className="w-full rounded bg-sky-500 text-white font-bold" onClick={() => setIsLogin(false)}>Çıkış Yap</button>
          <Customer />
        </div>
      }
    </div>
  );
}

export default App;