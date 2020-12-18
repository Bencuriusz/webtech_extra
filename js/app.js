$(function () {
    const $dataList = $('#dataList');
    let data = [];

    function get() {
        return new Promise(function (resolve, reject) {
            $.get("https://my-json-server.typicode.com/typicode/demo/posts", function (d) {
                data = d;
                resolve();
            });
        });

    }

    function deleteButton(e) {
        let item = $(e.target).closest("li");
        let key = item.data('key');
        deleteData(key).then(function () {
            item.remove();
        });
    }

    function deleteData(id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: 'https://my-json-server.typicode.com/typicode/demo/posts/' + id,
                type: 'DELETE',
                success: function () {
                    let r = data.findIndex(data => data.id === id);
                    if (r !== -1) {
                        data.splice(r, 1);
                    }
                    console.log("Deleted succesfully:");
                    resolve();
                },
                error: function () {
                    console.log("Delete request rejected");
                    reject();
                }
            });
        });

    }

    function updateDom(){
        console.log(data);
        $dataList.html('');

        $.each(data, function (key, value) {
            let li = $('<li/>')
                .html('<div>ID: ' + value.id + '</div>' + '<div>TITLE: ' + value.title + '</div>' + '<div> <button class="delete">DELETE</button> </div>')
                .data('key', value.id)
                .appendTo($dataList);
        });

        $(".delete").click(deleteButton);
    }

    Promise.all([get()]).then(function () {
            updateDom();
        });
});