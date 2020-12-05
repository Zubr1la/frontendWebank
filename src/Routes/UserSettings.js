import React from "react";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";
import {validation} from "../Components/Userfunctions";
import Editprofiledata from "../Components/Editprofiledata";
import Changepassword from "../Components/Changepassword";

class UserSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn:false,
            message:'',
            mounted:false,
            editProfileModal:false,
            changePasswordModal:false,
        }
    }


    componentDidMount() {
        validation().then(response => {
            if(response===undefined){
                this.setState({
                    message:"Savienojums ar datubāzi nav izdevies!",
                    loggedIn:false,
                    mounted:true,
                })
            }else {
                if(response.success){
                    this.setState({
                        loggedIn:true,
                        mounted:true,
                    });

                }else {
                    this.setState({
                        loggedIn:false,
                        mounted:true,
                    });
                }
            }

        });

    }




    render() {

        if(!this.state.loggedIn&&this.state.mounted){
            return <Redirect to ="/"/>
        }

        let editProfileModal=() => this.setState({editProfileModal:false});
        let changePasswordModal=() => this.setState({changePasswordModal:false});

        return( <div className="container">
                <div className='text-center'>
                    <h2 className="bg-warning">{this.state.message}</h2>
                </div>
                <div className="row">
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center">Labot profila informāciju</h3>
                        <Button variant="outline-success" size='lg' block onClick={()=>this.setState({editProfileModal:true})}>Labot personas datus</Button>

                        <Editprofiledata
                            show={this.state.editProfileModal}
                            onHide={editProfileModal}
                        />

                        <Button variant="outline-success" size='lg' block onClick={()=>this.setState({changePasswordModal:true})}>Nomainīt paroli</Button>

                        <Changepassword
                            show={this.state.changePasswordModal}
                            onHide={changePasswordModal}
                        />
                    </div>
                </div>
                <div className="row">

                </div>

            </div>

        )
    }

}
export default UserSettings;

