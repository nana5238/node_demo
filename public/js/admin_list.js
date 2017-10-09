$(function(){
	
	$(".del").click(function(){
		var  id=$(this).attr("data-id");
		
		$(this).parents('tr').remove();
		$.ajax({
			type:'DELETE',
			url:'/admin/delete?id='+id,
			success:function(res){
				if(res.success == 1){
					$(this).parents('tr').remove();
					alert(id);
				}
			}
		})
	})
})