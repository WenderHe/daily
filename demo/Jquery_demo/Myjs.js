$(function (){
    var index=0;
$("#b1").click(function (){
    $('.d1').show();
    $('.d2').hide();
    $('.d4').hide();
})
    $("#b2").click(function (){
        $('.d2').show();
        $('.d1').hide();
        $('.d4').hide();
    })
    $('#b3').click(function (){
        $('.d1').hide();
        $('#i1').val('');
        $('#i2').val('');
    })
    $('#b4').click(function (){
        $('.d2').hide();

        $('#i3').val('');
    })
    $('#b5').click(function (){
        var author=$('#i1').val();
        var bookname=$('#i2').val();
        var $trnew=$('<tr>'+
            '<td>'+author+'</td>'+
            '<td>'+bookname+'</td>'+
           ' <td><a href="javascript:" class="change">修改</a></td>'+
            '<td><a href="javascript:" class="delete">删除</a></td>'+
        '</tr>');

      $('.table').append($trnew);

        $('.delete').click(function (){
            $(this).parent().parent().remove();
        })
        // $('.change').click(function (){
        //     index=$(this).parent().parent().index();
        //     $('.d4').show();
        //
        // })
        $('.change').click(function (){
            var trparent=$(this).parent().parent();

            index=trparent.index();
            var fomerauthor=trparent.children().eq(0).text();
            var fomerbookname=trparent.children().eq(1).text();
            $('#i4').val(fomerauthor)
            $('#i5').val(fomerbookname)

            console.log(fomerauthor)
            $('.d4').show();
            $('.d1').hide();
            $('.d2').hide();

        })
        $('#b3').click();

    });
$('.delete').click(function (){``
    $(this).parent().parent().remove();
})

    $('.change').click(function (){
        var trparent=$(this).parent().parent();

        index=trparent.index();
        var fomerauthor=trparent.children().eq(0).text();
        var fomerbookname=trparent.children().eq(1).text();
$('#i4').val(fomerauthor)
        $('#i5').val(fomerbookname)

        console.log(fomerauthor)
        $('.d4').show();
        $('.d1').hide();
        $('.d2').hide();

    })

    $('#b7').click(function (){
        $('.d4').hide();
        $('#i4').val('');
        $('#i5').val('');
         // $('.tbody tr').eq(index).children().eq(0).html('abc');
        // index=$(this).parent().parent().index();
    })

    $('#b6').click(function (){
        var changeauthor=$('#i4').val();
        var changebookname=$('#i5').val();
        $('.tbody tr').eq(index).children().eq(0).html(changeauthor);
        $('.tbody tr').eq(index).children().eq(1).html(changebookname);
        $('#b7').click();
    })

    $('#b8').click(function (){
        var $sea=$('#i3').val();
        //先隐藏全部，再把符合筛选条件的值显示
        $('table tbody tr').hide().filter(':contains('+$sea+')').show();
        // var searchtxt=$('#i3').val();
$('#b4').click();
    })
$('#b9').click(function (){
    $('.tbody').find('tr').show();

});
});