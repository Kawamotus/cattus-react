import { Spinner } from "react-bootstrap"

export default function Loading() {
  return (
    <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Carregando...</span>
        </Spinner>
    </div>
  )
}
