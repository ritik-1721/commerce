//************************DATA TABLE********************************
var myTable;
var objNF = new Intl.NumberFormat("en-IN"); //objNF.format(table_total)
var footerColumnsSum = [];

function generateFooterColumnSum() {
  if (footerColumnsSum.length > 0) {
    myTable
      .columns(footerColumnsSum)
      .flatten()
      .each(function (colID) {
        $(myTable.table().footer())
          .find("td:eq(" + colID + ")")
          .html(
            objNF.format(
              Math.round(
                myTable.column(colID, { filter: "applied" }).data().sum() * 100
              ) / 100
            )
          );
      });
  }
}

function makeDataTable_Basic(
  tableID,
  filterColumnDDs = [],
  footerColumns = [],
  fixedColumns = [],
  pagingStatus = true
) {
  footerColumnsSum = footerColumns;
  myTable = $("#" + tableID).DataTable({
    paging: pagingStatus,
    pageLength: 10,
    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
    dom: "Bfrtip",
    ordering: false,
    destroy: true,
    buttons: [
      "colvis",
      { extend: "print", exportOptions: { columns: ":visible" } },
      //  { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL',  download: 'open' },
      {
        extend: "excelHtml5",
        customize: function (xlsx) {
          var sheet = xlsx.xl.worksheets["sheet1.xml"];
          $('row c[r^="C"]', sheet).attr("s", "2");
        },
      },
    ],
    drawCallback: function () {},
    fixedHeader: true,
    scrollY: fixedColumns.length > 0 ? "600px" : "",
    scrollX: fixedColumns.length > 0 ? true : false,
    scrollCollapse: fixedColumns.length > 0 ? true : false,
    fixedColumns: {
      leftColumns: fixedColumns[0],
      rightColumns: fixedColumns[1],
    },
  });

  generateFooterColumnSum();
  myTable.on("search.dt", function () {
    generateFooterColumnSum();
  });

  if (filterColumnDDs.length > 0) {
    // 2d array is converted to 1D array
    // structure the actions are
    // implemented on EACH column
    myTable
      .columns(filterColumnDDs)
      .flatten()
      .each(function (colID) {
        // Create the select list in the
        // header column header
        // On change of the list values,
        // perform search operation
        var myOptionList = [];
        var mySelectList = $(
          "<select  class='form-control input-sm select2' /><option value=''>" +
            $("#searchColumn" + colID).data("all_name") +
            "</option>"
        )
          .appendTo("#searchColumn" + colID) //myTable.column(colID).header()
          .on("change", function () {
            //myTable.column(colID).search($(this).val());

            if ($(this).val() != "") {
              myTable.column(colID).search(
                "^" +
                  $(this)
                    .val()
                    .replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&") +
                  "$",
                true,
                false,
                true
              );
            } // Specifice Search
            else {
              myTable.column(colID).search($(this).val());
            }

            // update the changes using draw() method
            myTable.column(colID).draw();

            if (colID != 6 && tableID == "dataTablesCameraStatus") {
              reTotalCameraSummary();
            }
          });

        // Get the search cached data for the
        // first column add to the select list
        // using append() method
        // sort the data to display to user
        // all steps are done for EACH column
        myTable
          .column(colID)
          .cache("search")
          .sort()
          .each(function (param) {
            if (myOptionList.indexOf(param) == -1) {
              mySelectList.append($("<option>" + param + "</option>"));
              myOptionList.push(param);
            }
          });
      });
  }

  // $(".select2").select2({ theme: "bootstrap4" });
}
//********************************************************
