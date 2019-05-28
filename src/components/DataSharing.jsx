
let data = undefined;

const DataSharing = () => {

    return data;
}

function getData() {
    return new Promise((resolve, reject) => {
        if (!data) {
            fetch('./../../data/sampledata.json')
                .then((res) => res.json())
                .then((json) => {
                    // console.log("json",json)
                    data = json;
                    resolve(data);
                }).catch((error) => {
                    console.log(error);
                })
        } else {
            resolve(data)
        }
    });
}

function setData(obj) {
    data = obj;
    console.log(data)

}

export default { DataSharing, getData, setData ,data};