import React, {useState} from 'react';
import AddUser from './components/User/AddUser';
import UserList from './components/User/UserList';

function App() {
    const [users, setUsers] = useState([]);

    const addUserHandler = (user) => {
        setUsers((prevUsers) => {
            return [user, ...prevUsers];
        });
    };

    return (
        <>
            <AddUser onAddUser={addUserHandler} />
            <UserList users={users} />
        </>
    );
}

export default App;
