Vue.component('scenario-summary-modal', {
    template: `
        <div>
            <div class="modal in" tabindex="-1" id="scenarioSummaryModal" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true" >
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">시나리오 요약</h5>
                            
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
        
                        <div class="modal-body">
                            <div id="scenarioSummaryGrid"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        $("#scenarioSummaryModal").on('show.bs.modal', function(){
            AUIGrid.resize("#scenarioSummaryGrid", 765, 300);
        });

        this.createGrid();
        this.search();
    },watch : {
        gridData : function(){
            AUIGrid.setGridData("#scenarioSummaryGrid", this.gridData);
        }
    },
    data: ()=>({
        gridData : [],
        gridLayout : [
            {dataField : "scenarioType", 	headerText : "장르"},
            {dataField : "productType", 	headerText : "제작구분", width : "12%"},
            {dataField : "count", 	headerText : "건수", width : "12%"},
            {dataField : "series", 	headerText : "회차", width : "12%"},
            {dataField : "amount", 	headerText : "제작비", width : "12%"},
            {dataField : "averageRate", 	headerText : "평균시청률", width : "15%"},
        ],
        gridProps : {
            enableFilter : false,
            enableSorting : false,
            headerHeight : 60,
            rowHeight : 50,
            editingOnKeyDown : false,
            autoGridHeight : false,
            autoGridWidth : true,
            ignoreColumnMinWidth : true,
            softRemoveRowMode : false,
            // 행 번호 컬럼 활성화 속성입니다.
            showRowNumColumn : false,
            /*추가 옵션*/
            showStateColumn : false,
            editable : false,
            noDataMessage : "데이터가 존재하지 않습니다."
        }
    }),
    methods: {
        draw: function(){
            //$THO.show()
            $("#scenarioSummaryModal").modal('show');
        },
        clear: function(){
            // 초기화 영역
        },
        search: function(){
            // 검색영역
            //this.createGrid();
            this.gridData.push({
                scenarioType : '드라마',
                productType : 'SD',
                count : 12,
                series : 10,
                amount : 20,
                averageRate : 123.456,
            });

            this.gridData.push({
                scenarioType : '드라마',
                productType : '수급',
                count : 1,
                series : 16,
                amount : 30,
                averageRate : 3.193,
            });

            this.gridData.push({
                scenarioType : '예능',
                productType : '자체',
                count : 1,
                series : 24,
                amount : 15,
                averageRate : 2.833,
            });


        },
        createGrid: function(){
            AUIGrid.destroy("#scenarioSummaryGrid");
            // grid 생성
            AUIGrid.create("#scenarioSummaryGrid", this.gridLayout, this.gridProps);

        }
    }
});