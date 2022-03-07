import React from 'react'
import { Alert, Badge } from "react-bootstrap";


// const InvalidImageName = (props) => {
//     const [show, setShow] = useState(true);
//     if (show) {
//         return (
//             <Alert
//                 show={true}
//                 variant="info"
//                 className="text-left"
//                 onClose={() => { setShow(false); props.setInfo() }}
//                 dismissible>
//                 <p>Image should follow appropriate naming convention:</p>
//                 <p>{props.message}</p>
//                 {props.invalidImageName.map((imageName, index) =>
//                     <Badge variant="warning" className="mx-1 py-1" key={index}>{imageName}</Badge>
//                 )}
//             </Alert>
//         );
//     }
// }

class InvalidImageName extends React.Component {

    render() {
        return (
            <Alert
                variant="warning"
                className="text-left"
                onClose={() => this.props.setInfo()}
                dismissible>
                {this.props.children}
                <div>Image files should follow naming convention:<br/>{this.props.message}<br/><br/>
                Correct following file names.</div>
                {this.props.invalidImageName.map((imageName, index) =>
                    <Badge variant="warning" className="mx-1 py-1" key={index}>{imageName}</Badge>
                )}
            </Alert>

        )
    }
}

export default InvalidImageName;