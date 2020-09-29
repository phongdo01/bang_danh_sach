var socket=io("localhost:3000");

socket.on("server-send-dki-thatbai",function(){
	alert("sai username  da co nguoi dki");
});
socket.on("server-send-dki-thanhcong",function(data){
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
});
socket.on("server-send-message", function(data){
	$("#tbl_id").append("<tr>" + "<td>"+  data.ID+  "</td> <td>" +data.USERNAME + "</td> <td>"   + data.LOGIN_TIMESTAMP+ " </td></tr>");
}); 
socket.on("server-send-danhsach-Users",function(data){
	$("#tbl_id").html("");
	console.log('data: ', data)
	data.forEach(function(i){
		$("#tbl_id").append("<tr>" + "<td>"+  i.ID+  "</td> <td>" +i.USERNAME + "</td> <td>"   + i.LOGIN_TIMESTAMP+ " </td></tr>");
	});
});
	socket.on("ai-do-dang-go-chu",function(data){
		$("#thongbao").html(data);
	});
	socket.on("ai-do-stop-go",function(){
		$("#thongbao").html(" ");
	});
$(document).ready(function(){
$("#chatForm").show();


	
	});