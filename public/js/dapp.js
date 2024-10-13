"use strict";

$(document).ready(function() {
  const tabs = document.querySelectorAll('li .zen');
  const contents = document.querySelectorAll('.content');
  const activeTab = localStorage.getItem('activeTab');
  const originalTitle = document.title; // Simpan judul awal
  
  tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
          tabs.forEach(tab => tab.classList.remove('active'));
          tab.classList.add('active');
          contents.forEach(content => content.classList.remove('active'));
          const contentId = tab.getAttribute('href');
          document.querySelector(contentId).classList.add('active');
          localStorage.setItem('activeTab', contentId);
          var body = $("html, body");
          body.stop().animate({
              scrollTop: 0
          }, 500, 'swing');
          
          // Mengganti judul saat tab diganti
          const newTitle = tab.getAttribute('data-target').replace('#', '')
          document.title = newTitle ? `${newTitle} - ${originalTitle}` : originalTitle;
      });
      
      if (activeTab && tab.getAttribute('href') === activeTab) {
          tab.click();
      }
      
      if (!localStorage.getItem('activeTab')) {
          localStorage.setItem('activeTab', '#dashboard');
          location.reload();
      }
  });
});

$(document).ready(function () {
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href)
  }
})

$(document).ready(function () {
  $("#report_modal").submit(function (e) {
    var formObj = $(this)
    var formURL = formObj.attr("action")
    var formData = new FormData(this)
    $.ajax({
      url: formURL,
      type: "POST",
      data: formData,
      contentType: false,
      cache: true,
      processData: false,
      success: function (data, textStatus, jqXHR) {
        if (data == "ok") {
          Swal.fire({
            title: "Reported!",
            icon: "success",
            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
            buttonsStyling: !1,
            showCloseButton: !1,
            timer: 1500
          }).then(function () {
            window.location = "/#reported"
            location.reload()
          })
        } else {
          Swal.fire({
            title: "Oops...",
            text: data.message,
            icon: "error",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !0
          })
        }
      },
    })
    e.preventDefault()
  })
})

$(document).ready(function () {
  var table = $('.table_api').DataTable()
  var tableBody = '.table_api tbody';

  $(tableBody).on('click', 'tr', function () {
    var cursor = table.row($(this))
    var data = cursor.data()
    $('input[name=feature]').val(data[0])
  })
})

$(document).ready(function () {
  $('.table_api').DataTable({
    destroy: true,
    scrollCollapse: true,
    autoWidth: false,
    responsive: true,
    columnDefs: [{
      targets: "datatable-nosort",
      orderable: false,
    }],
    "paging": false,
    "lengthChange": false,
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    "language": {
      "info": "_START_-_END_ of _TOTAL_ entries",
    },
    searching: false
  })
})

$(document).ready(function () {
  $('.table_admin').DataTable({
    destroy: true,
    scrollCollapse: true,
    autoWidth: false,
    responsive: true,
    columnDefs: [{
      targets: "datatable-nosort",
      orderable: false,
    }],
    bFilter: false,
    order: [[0, 'desc']],
    pageLength: 7,
    "paging": true,
    "lengthChange": false,
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    "language": {
      "info": "_START_-_END_ of _TOTAL_ entries",
      searchPlaceholder: "Search",
    },
  })
})


$(document).ready(function () {
  $('.table_report').DataTable({
    destroy: true,
    scrollCollapse: true,
    autoWidth: false,
    responsive: true,
    columnDefs: [{
      targets: "datatable-nosort",
      orderable: false,
    }],
    bFilter: false,
    order: [[1, 'desc']],
    pageLength: 7,
    "paging": true,
    "lengthChange": false,
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    "language": {
      "info": "_START_-_END_ of _TOTAL_ entries",
      searchPlaceholder: "Search",
    },
  })
})

$(document).ready(function () {
  $("#search").keyup(function () {
    searchTable($(this).val())
  })
})

function searchTable(inputVal) {
  var table = $(".cari_api")
  table.find("tr").each(function (index, row) {
    var allCells = $(row).find("td")
    if (allCells.length > 0) {
      var found = false;
      allCells.each(function (index, td) {
        var regExp = new RegExp(inputVal, "i")
        if (regExp.test($(td).text())) {
          found = true;
          return false;
        }
      })
      if (found == true) $(row).show()
      else $(row).hide()
    }
  })
}