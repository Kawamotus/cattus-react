import React from 'react'

function CardUser({name, email, username, phone}){
    return <div style={{ width: "300px", padding: "5px", border: "2px solid #c6c6c6", borderRadius: "6px", marginBottom: "10px"}}>
        <span><i style={{fontWeight: "bold"}}>{name}: </i>{email}</span>
        <br />
        <span>{username} - {phone}</span>
    </div>
}

const AnimalList = () => {
    
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    async function loadUsers(){
        //faz a requisição no servidor
        setIsLoading(true);
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users', {
            //aqq passo o method(post, get, put, patch, delete)
            //o padrao é o get, que serve apenas para puxar dados
            //method: "get",
            //aqq passo o que será passado do body para a api
            // body: {
            //     nome: "nome",
            //     email: "email"
            // }
        });
        //transforma a resposta em json
        const data = await resposta.json();
        setIsLoading(false);
        setUsers(data);

    }

    React.useEffect(() => {
        loadUsers()
    }, [])

    return (
        <div className='teste-centro'>
            <button onClick={loadUsers}>Reload</button>
            {isLoading && <p>carregando...</p>}
            {users.map((user) => 
                <CardUser name={user.name} email={user.email} username={user.username} phone={user.id} key={user.id} />
            )}
        </div>
    )
}

export default AnimalList
