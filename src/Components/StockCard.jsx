import { Card, ProgressBar } from 'react-bootstrap';

export default function StockCard({titulo, limite, qtdAtual, gasto}) {

    const progress = (qtdAtual / limite) * 100

    return (
        <>
            <Card>
                <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    Limite: {limite} 
                    <br />
                    Quantidade Atual: {qtdAtual} 
                    <br />
                    Media de gasto diario: {gasto}
                </Card.Text>
                <ProgressBar striped now={progress} label={`${qtdAtual}`} variant={progress >= 65 ? 'success' : progress >= 30 ? 'warning' : 'danger' }/>
                </Card.Body>
            </Card>
        </>
    )
}
