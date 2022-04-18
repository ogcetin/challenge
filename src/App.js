import React, {useState} from 'react';
import Menu from './components/Menu';
import Customer from './modules/customer/Customer';
import UserLogin from './modules/user/UserLogin';
import Password from './modules/user/Password';
import Data from './modules/data/Data';
import Activity from './modules/activity/Activity';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("password");
  return (
    <div className="bg-slate-800">
      { isLogin == false && <UserLogin changeLoginStatus={(newStatus) => setIsLogin(newStatus)} />}
      { isLogin && 
        <div className="grid gap-2 grid-cols-6 h-screen">
          <div className="h-screen bg-slate-900 col-span-1 text-white">
            <Menu changeMenu={(selectedMenu) => setSelectedComponent(selectedMenu)} />
          </div>
          <div className="col-span-5">
            <div className="flex justify-end bg-slate-900 h-20 items-center">
              <button className="rounded p-2 mr-5 h-10 bg-sky-500 text-white font-bold" onClick={() => setIsLogin(false)}>Çıkış Yap</button>
            </div>
            <div className="h-3 bg-slate-800" />
            <div className="content bg-slate-900 py-5 h-full">
              { selectedComponent === "password" && <Password /> }
              { selectedComponent === "customer" && <Customer /> }
              { selectedComponent === "data" && <Data /> }
              { selectedComponent === "activity" && <Activity /> }
            </div>
            <div className="footer"></div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;