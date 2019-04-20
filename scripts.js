// 랙을 보기 위한 카운터
var counter = 0;

$(function () {
    // 매 초마다 카운터 갱신
    setInterval(function () {
        counter++;
        $('#counter').html(counter);
    }, 1000);

    // 데이터 생성
    var data = [];

    for (let i = 0; i < 100000; i++) {
        data.push('아이템' + i);
    }

    // 클릭 이벤트 핸들러
    $('#title').click(function (e) {
        $('#popup').toggle();
    });

    // 데이터로 셀렉트박스 항목 만들기
    for (let i = 0; i < data.length; i++) {
        changeQueue.enqueue({ // 바로 실행하지 않고 객체 형태로 할일을 큐 리스트배열에 넣어줌.
            excute:function() {
                const elem = createItem(data[i]);
                $('#list').append(elem);
            }
        });
    }
    requestIdleCallback(processChanges);

    function processChanges(deadline) {
        while (deadline.timeRemaining() > 0 && !changeQueue.isEmpty()) {
            var c = changeQueue.dequeue();
            if (c) {
                c.execute();
            }
        }
        if (!changeQueue.isEmpty()) {
            requestIdleCallback(processChanges);
        } else {
            console.timeEnd();
        }
    }
    // setInterval(function(){ // 최대한 자주 0, 큐 리스트에 넣어던 객체를 하나씩 빼서 실행함.
    //     // 한번에 30개씩 빼서 실행하라.
    //     for (var i = 0; i < 30 && !changeQueue.isEmpty(); i++) {
    //         var c = changeQueue.dequeue();
    //         if (c) { // 만약에 큐리스트에서 빼낸것이 있다면
    //             c.excute(); // 그 빼낸것에 excute()를 실행해라.
    //         }
    //         if (changeQueue.isEmpty()) { // 만약에 list.length === 0 가 참이면
    //             console.timeEnd(); // console.timeEnd()를 실행하라.
    //         }    
    //     }
    // }, 0);
});



function createItem(d) {
    console.log(d)
    var elem = $('<li>' + d + '</li>');

    elem.addClass('item');

    // 아이템 클릭 시 선택되도록 함
    elem.click(function () {
        $('#title').html(d);
        $('#popup').hide();
    });

    return elem;
}
