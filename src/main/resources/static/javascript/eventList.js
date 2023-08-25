const eventTabs= $(".event-tab>li>a");
const eventContents=$(".event-content");
$(function(){
    eventTabs.eq(0).click();

});

eventTabs.on("click",function(){
    const index = eventTabs.index(this);
    eventTabs.removeClass("event-active");
    eventTabs.eq(index).addClass("event-active");
    eventContents.hide();
    $(".winnerTr").empty();
    $("#pageNavi").empty();
    eventContents.eq(index).show();
    if(index==1){
        getWinnerBoard(1);
    }
});

function getWinnerBoard(num){
    $(".winnerTr").empty();
    $("#pageNavi").empty();
    let reqPage = num;

    $.ajax({
        url : "/event/winnerBoard",
        type : "get",
        data : {reqPage : reqPage},
        success : function(data){
            for(let i=0 ; i<data.winnerBoardList.length ; i++){
                const winnerBoard = data.winnerBoardList[i];
                const tr = $("<tr>");
                tr.addClass("winnerTr")
                const noTd = $("<td>");
                noTd.text(winnerBoard.winNo);
                const titleTd = $("<td>");
                titleTd.text(winnerBoard.winTitle);
                const writerTd = $("<td>");
                writerTd.text(winnerBoard.winWriter);
                const regDateTd = $("<td>");
                regDateTd.text(winnerBoard.regDate);
                tr.append(noTd).append(titleTd).append(writerTd).append(regDateTd);
                $(".notice-tbl").children("tbody").append(tr);
            }
            const pageNavi = pageLink(reqPage,data.totalPage,"getWinnerBoard");
            $("#pageNavi").append(pageNavi);
        }
    });
}

function pageLink(reqPage, totalPage, funcName){
    let pageUrl = "<ul class='pagination'>";

    const pageLimit = 5;
    let start = parseInt((reqPage - 1) / pageLimit) * pageLimit + 1;
	let end = start + pageLimit - 1;
	
	if (totalPage < end) {
        end = totalPage;
	}
	
	let nextPage = end + 1;
	
	//맨 첫 페이지
	if (reqPage > 1 && pageLimit < reqPage) {
        pageUrl += "<li><a class='page-item' href='javascript:" + funcName + "(1);'></a></li>";
	}
	//이전 페이지
	if (reqPage > pageLimit) {
        pageUrl += " <li><a class='page-item' href='javascript:" + funcName + "(" + (start == 1 ? 1 : start - 1) + ");'><span class='material-icons'>chevron_left</span></a></li>";
	}
	//~pageLimit 맞게 페이지 수 보여줌
	for (let i = start; i <= end; i++) {
        if (i == reqPage) {
            pageUrl += "<li><a class='page-item active-page' href='javascript:void(0)'>" + i + "</a></li>";
        } else {
            pageUrl += "<li><a class='page-item' href='javascript:" + funcName + "(" + i + ");'> " + i + " </a></li>";
        }
	}
	//다음 페이지
	if (nextPage <= totalPage) {
        pageUrl += "<li><a class='page-item' href='javascript:" + funcName + "(" + (nextPage < totalPage ? nextPage : totalPage) + ");'><span class='material-icons'>chevron_right</span></a></li>";
	}
	//맨 마지막 페이지
	if (reqPage < totalPage && nextPage < totalPage) {
        pageUrl += "<li><a class='page last' href='javascript:" + funcName + "(" + totalPage + ");'></a></li>";
	}

    pageUrl += "</ul>";
	
	return pageUrl;
}

