import Header from "../_components/header"

const Admin = () => {
  return (
    <>
      <Header />
      <p className="mt-2 text-center font-bold"> Bem vindo ao a sua loja!</p>

      <div className="m-2 h-[50px] bg-slate-500">
        <p>cadastrar categoria</p>
      </div>

      <div className="m-2 h-[50px] bg-slate-500">
        <p>remover categoria</p>
      </div>

      <div className="m-2 h-[50px] bg-slate-500">
        <p>cadastrar produtos</p>
      </div>

      <div className="m-2 h-[50px] bg-slate-500">
        <p>remover produtos</p>
      </div>
    </>
  )
}

export default Admin
