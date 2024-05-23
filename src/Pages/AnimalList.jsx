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
   // const [email, setEmail] = React.useState()

    // async function call_api(){
    //     const responde = await fetch("", {
    //         method: "POST",
    //         body: JSON.stringify(
    //             {
    //                 email:email
    //             }
    //         )
    //     }) 
    // }

    async function loadUsers(){
        //faz a requisição no servidor
        setIsLoading(true);
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users', {
            //aqq passo o method(post, get, put, patch, delete)
            //o padrao é o get, que serve apenas para puxar dados
            // method: "POST",
            // //aqq passo o que será passado do body para a api
            //  body: {
            //      nome: "nome",
            //      email: "email"
            //  },
            //  headers:{
            //     k:
            //     token: localStorage.getItem('token')
            //  }
        });
        // localStorage.setItem('token', "teste")
        // console.log(localStorage.getItem('token'))
        // //transforma a resposta em json
        const data = await resposta.json();
        setIsLoading(false);
        setUsers(data);

    }

    React.useEffect(() => {
        loadUsers()
    }, [])

    return <>
        <div className='teste-centro'>
            <button onClick={loadUsers}>Reload</button>
            {isLoading && <p>carregando...</p>}
            {users.map((user) => 
                <CardUser name={user.name} email={user.email} username={user.username} phone={user.id} key={user.id} />
            )}
        </div>
        {/* <div>
            <input type="text" name="" id="" onClick={(e)=>setEmail(e.target)}/>

            <button onClick={call_api()}></button>
        </div> */}
        </>
    
}

export default AnimalList
