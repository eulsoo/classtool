var changeQueue = (function () {
    var list = [];
    return {
        enqueue: function(c){
            list.push(c);
        },
        dequeue: function(){
            return list.shift();
        },
        isEmpty: function(){
            return list.length === 0;
        }
    }
    
})();