import { memo } from 'react';
import tableStyles from '../tableStyles.module.css'
import inputStyles from '../InputStyles.module.css'

function UserSelectList({ users, onCheckBoxChange }) {
    return (
        <table className={tableStyles.table100} >
            <thead className={tableStyles.Table100Head}>
                <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody className={tableStyles.Table100Body}>
                {users && users.length > 0 && users.map(user => {
                    return (
                        <tr key={user.idUser}>
                            <td>
                                <input className={inputStyles.checkBox}
                                    type="checkbox"
                                    email={user.mail}
                                    name={user.name}
                                    id={user.mail}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onCheckBoxChange(user.mail)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.mail}</td>
                        </tr>
                    )
                })
                }

                {/* <tr>
                    <td>
                        <input className={inputStyles.checkBox}
                            type="checkbox"
                            email='nigga1@gmail.com'
                            name='Hello kitty1'
                            id='id2'
                            onClick={() => onCheckBoxChange('id2')}
                        />
                    </td>
                    <td>Hello kitty1</td>
                    <td>nigga1@gmail.com</td>
                </tr>
                <tr>
                    <td>
                        <input className={inputStyles.checkBox}
                            type="checkbox"
                            email='nigga2@gmail.com'
                            name='Hello kitty2'
                            id='id3'
                            onClick={() => onCheckBoxChange('id3')}
                        />
                    </td>
                    <td>Hello kitty2</td>
                    <td>nigg2@gmail.com</td>
                </tr> */}

            </tbody>
        </table>
    )
}


export default UserSelectList;