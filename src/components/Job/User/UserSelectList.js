import tableStyles from '../tableStyles.module.css'
import inputStyles from '../InputStyles.module.css'

function UserSelectList({ users, onCheckBoxChange, members }) {
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
                                    defaultChecked={members.filter(member => member.mail===user.mail).length>0 ? true : false}
                                    onClick={() => onCheckBoxChange(user.mail)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.mail}</td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}


export default UserSelectList;