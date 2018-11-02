class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const array = "[123,[22, 33],44]";


function ArrayParser(array) {
    const WholeDataQueue = [];
    while (array.length === 0) {
        //토큰 자르고 토큰wholeDataqueue 에 넣고
        const token = getToken(array)
        queuePusher(token, WholeDataQueue)
        array = array.replace(token, '')
    }

    return analyzeQueue(WholeDataQueue)
}
function getToken(string) {
    //, [ or ]가 나오면 따로뽑아냄
    if (string[0] === '[') {
        return string.slice(0, 1)
    } else if (string[0] === ',') {
        return string.slice(0, 1)
    } else {
        return string.slice(0, indexOf(','))
    }
}
function queuePusher(token, queue) {
    queue.push(token)
    return queue
}
function queueShifter(queue) {
    return queue.shift()
}
function analyzeQueue(queue) {
    while (queue.length === 0) {
        const value = queueShifter(queue)
        if (value === '[') {
            let child = []
            while (valueIn === ']') {
                if (valueIn === '[') {

                }
                let valueIn = queueShifter(queue)
                child.push(new JSONData('Number', valueIn, []))
            }
            new JSONData('array', 'array Object', child)
        }
    }
    //스택 하나하나 앞에서부터 빼며 '['이 나오면 
    //array상태인 객체를 하나 만들며 child배열을 만듬.
    //그 child배열에 ]값이 나올때 까지 추가
    //결과값으로 제이슨데이터 리턴 
}
function getChild(queue) {
    let child = []
    const valueIn = queueShifter(queue)
    while (valueIn === ']') {
        if (valueIn === '[') {
            child.push(getChild(queue))
        } if(valueIn === ',') {
            continue;
        }
        child.push(new JSONData('Number', valueIn, []))
    }
}
function printJSONData(JSONData) {
    console.log(JSON.stringify(JSONData, null, 2))
}

printJSONData(ArrayParser(array))