import { Component } from 'react';
import axios from 'axios';
class PersonList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //chu y cach khai bao
            data: []
        }
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                console.log(res['data'])
                // const data = res.data
                this.setState({
                    data: res.data
                })
            })
    }


    renderData() {
        let data = this.state.data;
        // chu y giup: trc khi MAP thi pai kiem tra data co du lieu k. 
        // data dang la Object, muon kiem tra co data , thi dung length >0
        if (data.length > 0) {
            // data co bnhieu du lieu thi vong lap MAP chay chung` no' vong
            return data.map((value, key) => {
                // console.log(value)
                return (
                    //tra ve bay nhieu the li

                    // mo rong, a show ra nhieu html thoi 
                    <div className="xxx">
                        <p key={key}>name: {value['name']}</p>
                        <div>
                            usersname: {value['username']}
                        </div>
                        <p>email: email</p>
                    </div>
                )
            })
        }
    }


    render() {
        return (
            <div>
                khong nen viet xu ly js vao trong render html
                {this.renderData()}
            </div>

        )
    }
}

export default PersonList;