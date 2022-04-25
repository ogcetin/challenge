import React, {useState} from 'react';
import Menu from './components/Menu';
import Customer from './modules/customer/Customer';
import UserLogin from './modules/user/UserLogin';
import Password from './modules/user/Password';
import Data from './modules/data/Data';
import Activity from './modules/activity/Activity';
import User from './modules/user/User';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("password");
  return (
    <div>
      { isLogin == false && <UserLogin changeLoginStatus={(newStatus) => setIsLogin(newStatus)} />}
      { isLogin && 
        <div className="grid gap-2 grid-cols-6 h-screen">
          <div className="h-screen bg-white-transparent col-span-1 ">
            <Menu changeMenu={(selectedMenu) => setSelectedComponent(selectedMenu)} />
          </div>
          <div className="col-span-5">
            <div className="flex justify-end bg-white-transparent h-20 items-center">
              <button className="rounded p-2 mr-5 h-10 bg-sky-500 text-white font-bold" onClick={() => setIsLogin(false)}>Çıkış Yap</button>
            </div>
            <div className="h-3 bg-white" />
            <div className="content py-5 h-full">
              { selectedComponent === "password" && <Password /> }
              { selectedComponent === "user" && <User /> }
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