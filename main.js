
$(function () {
  $(document).ready(function(){
    $('#updatetable').css('display','none');

    var count = 2;  //start loading data from second page

    //infinte scrolling
              $(window).scroll(function(){
                      if  ($(window).scrollTop() == $(document).height() - $(window).height()){   //checking end of page
                        $.ajax({
                            url: "http://localhost:3000/users?_page="+count+"&_limit=20",   //load next 20 items
                            type:'GET',
                            success: function (users) {
                              $.each(users,function (i,user) {
                                        var tbody = $("#users tbody");
                                        var Name = user.name;
                                        var Email = user.email;
                                        var DoB = user.dob;
                                        var Address = user.address;
                                        var tr = $('<tr>');
                                        var name = $("<td><input type='text' id='name'> ").text(Name);
                                        var dob = $("<td><inputtype='text' id='dob'>>").text(DoB);
                                        var email = $("<td><input type='text' id='email'>>").text(Email);
                                        var address = $("<td><input type='text' id='address'>>").text(Address);

                                        tr.append(name);
                                        tr.append(dob);
                                        tr.append(email);
                                        tr.append(address);
                                        tr.append('<td><button user-id='+user.id+' class ="btn btn-success btn-sm update">Edit</button></td>');
                                        tr.append('<td><button user-id='+user.id+'  class ="btn btn-warning btn-sm remove">Delete</button></td>');

                                        tbody.append(tr);
                              })
                            }
                        })
                         count++;
                      }
              });

  });

  var $name = $('#Name');   //caching the variable
  var $dob = $('#DOB');
  var $email = $('#Email');
  var $address = $('#Address');
  var $users =$('#users');

  $.ajax({
    type:'GET',
    url:'http://localhost:3000/users?_page=1&_limit=20',
    success: function (users) {
      $.each(users,function (i,user) {

                var tbody = $("#users tbody");
                var Name = user.name;
                var Email = user.email;
                var DoB = user.dob;
                var Address = user.address;
                var tr = $('<tr>');
                var name = $("<td>").text(Name).attr('id','name'+user.id);
                var dob = $("<td>").text(DoB).attr('id','dob'+user.id);
                var email = $("<td>").text(Email).attr('id','email'+user.id);
                var address = $("<td>").text(Address).attr('id','address'+user.id);

                tr.append(name);
                tr.append(dob);
                tr.append(email);
                tr.append(address);
                tr.append('<td><button user-id="'+user.id+'" id="u'+user.id+'" class ="btn btn-success btn-sm update">Edit</button></td>');
                tr.append('<td><button user-id="'+user.id+'" class ="btn btn-warning btn-sm remove">Delete</button></td>');

                tbody.append(tr);
      })

    }
  }).done(function(){
      $('.update').click(function(){
      $('#updatetable').css('display','block');
      var id=$(this).attr('user-id');
      $('#saveId').val(id);
      $('#saveName').attr("placeholder",$('#name'+id).text());
      $('#saveDob').attr("placeholder",$('#dob'+id).text());
      $('#saveEmail').attr("placeholder",$('#email'+id).text());
      $('#saveAdd').attr("placeholder",$('#address'+id).text());
    })
  })

  $('#save').click(function(){
    var data={};
    data.id=$('#saveId').val();
    data.name=$('#saveName').val();
    data.dob=$('#saveDob').val();
    data.email=$('#saveEmail').val();
    data.address=$('#saveAdd').val();
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/users/'+$('#saveId').val(),
      data: data
    }).done(function() {
      $('#updatetable').css('display','none');
    });
  })

  $('#add-user').on('click', function() {
        var user = {
            name: $name.val(),
            dob: $dob.val(),
            email: $email.val(),
            address: $address.val(),
        };

        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/users',
          data: user,
          success: function (user) {

            var tbody = $("#users tbody");
            var Name = user.name;
            var Email = user.email;
            var DoB = user.dob;
            var Address = user.address;
            var city = user.city;
            var id = user.id;
            var work =user.work;
            var tr = $('<tr>');
            var name = $("<td>").text(Name);
            var dob = $("<td>").text(DoB);
            var email = $("<td>").text(Email);
            var address = $("<td>").text(Address);

            tr.append(name);
            tr.append(dob);
            tr.append(email);
            tr.append(address);

            tbody.append(tr);
          },
          error: function () {
              alert('error saving user');
          }
        });
  });

  $users.delegate('.remove','click',function () {
      var $tr =   $(this).closest('tr');
      $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/users/'+ $(this).attr('user-id'),
        success: function () {
            $tr.fadeOut(300,function() {
            $(this).remove();
            })
        }
      });
  });

});
