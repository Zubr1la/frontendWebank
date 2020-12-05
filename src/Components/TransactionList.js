import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class TransactionList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choice:0
        };

    }

    showSentData(val){
        if(val===0){
            return <div>
                <h3>Izvēlies pārskata veidu!</h3>
            </div>
        }else if(val===1){
            return <div>
                <br></br>
                <h4 className="text-center">Nosūtītie pārskaitījumi</h4>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Laiks</th>
                        <th>Saņēmējs</th>
                        <th>Maksājuma informācija</th>
                        <th>Summa Eur</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.sent.map(sent=>{
                        return <tr key={sent._id}>
                            <td>{sent.date_created.split("T")[0]} {sent.date_created.split("T")[1].split(".")[0]}</td>
                            <td>{sent.receiverID}</td>
                            <td>{sent.comment}</td>
                            <td>{sent.balance.toFixed(2)}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </div>
        }else if(val===2){      ////////////////////////////////////////RECEIVED>>>
            return <div>
                <br></br>
                <h4 className="text-center">Saņemtie pārskaitījumi</h4>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Laiks</th>
                        <th>Maksātājs</th>
                        <th>Maksājuma informācija</th>
                        <th>Summa Eur</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.received.map(received=>{
                        return <tr key={received._id}>
                            <td>{received.date_created.split("T")[0]} {received.date_created.split("T")[1].split(".")[0]}</td>
                            <td>{received.senderID}</td>
                            <td>{received.comment}</td>
                            <td>{received.balance.toFixed(2)}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </div>
        }
    }

    showSent(val){

        this.setState({
           choice:val,
        });


    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <Button variant="btn btn-info" size='md' block onClick={()=> this.showSent(1)}>Veiktie maksājumi</Button>
                    </div>

                    <div className="col-lg-6">
                        <Button variant="btn btn-success" size='md' block onClick={()=> this.showSent(2)}>Saņemtie pārskaitījumi</Button>
                    </div>
                </div>

               <div className="text-center">
                   {this.showSentData(this.state.choice)}
               </div>
            </div>
        )
    }


}
export default TransactionList;

