import React from 'react';
function Score(props){
    let x=props.dist;
    
    let res;
    if(x<=50){
        res=100;
    }else if(x>50 && x<=200){
        res = 75;
    }else if(x>200 && x<=500){
        res=50;
    }else{
        res=20;
    }
    return (
        <div>
            <p>Score:- {res}</p>
        </div>
    );
}

export default Score;