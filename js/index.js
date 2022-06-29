let resultGrid = ""
let app = {
    el : "#app",
    watch : {
        gridData : function(){
            AUIGrid.setGridData(resultGrid, this.gridData);
        }
    },
    mounted(){
        resultGrid = AUIGrid.destroy("#resultGrid");
        resultGrid = AUIGrid.create("#resultGrid", this.gridLayout, this.gridProps);

        // 페이지 진입 시 기준년도 산출
        this.searchCommand.baseYear = new Date().getFullYear();
        // 기준년도 항목정의(과거:3년, 향후:5년)
        for(let idx = this.searchCommand.baseYear - 2; idx < (this.searchCommand.baseYear + 5);idx += 1) {
            this.selectOptionItems.baseYear.push({value:`${idx}`, text:`${idx}년`});
        }

        this.selectOptionItems.status.push({value: 'I', text: '진행중'});
        this.selectOptionItems.status.push({value: 'C', text: '확정'});

        this.search();

    },
    data:() =>({
        selectOptionItems : {
            baseYear : [{value:"", text:'기준년도'}],
            status: [{value:"", text:'채널그룹명'}],
        },
        searchCommand: {
            scenarioName:null,
            baseYear: "",
            status:"",
        },
        gridData : [],
        gridLayout : [
            {headerText : "선택", width : "5%",
                renderer : {
                    type : "CheckBoxEditRenderer",
			showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
                },
                // labelFunction : function(rowIndex, columnIndex, value, headerText, item) {
                //     // let isChildren = item['version'] > 0;
                //     // return `<div class="${isChildren ? 'small':''}">${ isChildren ? item['id'] + '-' + item['version']: item['id'] }</div>`
                //     return `<div class="form-check">
                //                 <input class="form-check-input" type="checkbox">
                //             </div>        
                //     `
                // }
                editRenderer : {
                    type : "CheckBoxEditRenderer",                    
                }
            },
            {dataField : "baseYear", 	headerText : "기준년도", width : "7%",
			editRenderer : {
				type : "DropDownListRenderer",
				list : ["2020년","2021년","2022년"]
			}
            },
            {dataField : "fromDate", 	headerText : "From", width : "7%",
                editRenderer : {
                    type : "BTCalendarRenderer",
                    onlyCalendar : true,
                    // bootstrap-datepicker 속성을 여기에 설정하십시오.
                    // API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
                    btOpts : {
                        language : "ko"
                    } // end of btOpts
                },
            },
            {dataField : "toDate", 	headerText : "to", width : "7%",
                editRenderer : {
                    type : "BTCalendarRenderer",
                    onlyCalendar : true,
                    // bootstrap-datepicker 속성을 여기에 설정하십시오.
                    // API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
                    btOpts : {
                        language : "ko"
                    } // end of btOpts
                },
            },
            {dataField : "blockGrpName", 	headerText : "블록 그룹명",
                editRenderer : {
                    type : "InputEditRenderer",								
                    showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
                    inputMode : "text"
                }
            },
            {dataField : "targetBlock", 	headerText : "대상블록",
                editRenderer : {
                    type : "DropDownListRenderer",
                    list : ["블록01 (시간대)","블록02 (시간대)","블록03 (시간대)","블록04 (시간대)"]
                }
            },
            {dataField : "useYN", 	headerText : "활용여부", width : "7%",
            editRenderer : {
				type : "DropDownListRenderer",
				list : ["Y","N"]
			}},
            {dataField : "summary", headerText : "내용",editRenderer : {
                type : "InputEditRenderer",								
                showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
                inputMode : "text"
            }},
            // {headerText : "등록정보", width : "15%",
            //     renderer : {
            //         type : "TemplateRenderer"
            //     },
            //     labelFunction : function(rowIndex, columnIndex, value, headerText, item){
            //         return `${item['departName']} | ${item['writer']} | ${item['createAt']}`//item.bdp_mod_id + "|" + item.bdp_mod_dtm;
            //     }
            // },
            // {headerText : "관리", width : "20%",
            //     renderer : {
            //         type : "TemplateRenderer"
            //     },
            //     labelFunction : function(rowIndex, columnIndex, value, headerText, item){
            //         let btnList = [];
            //         let setBtnClass = function(){
            //             return btnList.length > 0 ? 'ml-1' : '';
            //         }
            //         // let plClass = ${btnList.length > 0 ? 'pl-1':''};
            //         // I : 진행중
            //         if(item['status'] == 'I') {
            //             btnList.push(`<button class="btn btn-primary" onClick="app.edit(${item['id']})">수정</button>`);

            //             // 상위 ID가 있는 경우 특정 시나리오의 하위버전
            //             if((item['version'] || 0) < 1) {
            //                 btnList.push(`<button class="btn btn-primary ${setBtnClass()}" onClick="app.version(${item['id']})">버전추가</button>`);
            //             }
            //             btnList.push(`<button class="btn btn-primary ${setBtnClass()}" onClick="app.copy(${item['id']})">복사</button>`);
            //             btnList.push(`<button class="btn btn-danger ${setBtnClass()}" onClick="app.remove(${item['id']})">삭제</button>`);
            //             btnList.push(`<button class="btn btn-success ${setBtnClass()}" onClick="app.done(${item['id']})">확정</button>`);
            //         } else {
            //             if((item['version'] || 0) < 1) {
            //                 btnList.push(`<button class="btn btn-primary ${setBtnClass()}" onClick="app.version(${item['id']})">버전추가</button>`);
            //             }
            //             btnList.push(`<button class="btn btn-primary ${setBtnClass()}" onClick="app.copy(${item['id']})">복사</button>`);
            //         }
            //         return `<div class="d-flex flex-fill justify-content-start">${btnList.join('')}</div>`;
            //     }
            // }
        ],
        gridProps : {
            enableFilter : false,
            enableSorting : false,
            headerHeight : 60,
            rowHeight : 50,
            editingOnKeyDown : false,
            autoGridHeight : false,
            autoGridWidth : false,
            ignoreColumnMinWidth : true,
            softRemoveRowMode : false,
            // 행 번호 컬럼 활성화 속성입니다.
            showRowNumColumn : false,
            /*추가 옵션*/
            showStateColumn : false,
            editable : true,
            noDataMessage : "엑셀데이터를 붙여넣거나 행추가를 통해 데이터를 입력하세요."
        }
    }),
    methods: {
        search: function(){
            console.log('search', this.searchCommand);
            this.setTestData();
        },
        createScenario: function(){
            this.$refs['refScenarioSummary'].draw();
        },
        edit: function(id){
            console.log('준비중 edit', id);
        },
        version: function(id) {
            console.log('준비중 version', id);
        },
        copy: function(id){
            console.log('준비중 copy', id);
        },
        remove: function(id){
            console.log('준비중 remove', id);
        },
        done: function(id){
            console.log('준비중 done', id);

        },
        setTestData: function(){
            this.gridData = [];
            this.gridData.push({
                writer: '홍길동',
                departName: '부서명',
                createAt: '2022.10.12',
                baseYear : '2023',
                fromDate:'2023.01.1',
                toDate:'2023.12.31',
                blockGrpName:'블록그룹명01',
                targetBlock:'블록01, 블록02, 블록03',
                status:'I',
                useYN:'Y',
                id: 1,
                version: 0,
            });
            this.gridData.push({
                writer: '홍길동',
                departName: '부서명',
                createAt: '2022.10.12',
                baseYear : '2023',
                fromDate:'2023.01.1',
                toDate:'2023.12.31',
                blockGrpName:'블록그룹명02',
                targetBlock:'블록01, 블록02, 블록03',
                status:'I',
                useYN:'Y',
                id:1,
                version: 1,
            });
            this.gridData.push({
                writer: '홍길동',
                departName: '부서명',
                createAt: '2022.10.12',
                baseYear : '2023',
                fromDate:'2023.01.1',
                toDate:'2023.12.31',
                blockGrpName:'블록그룹명03',
                targetBlock:'블록01, 블록02, 블록03',
                status:'I',
                useYN:'Y',
                id:1,
                version: 2,
            });
            this.gridData.push({
                writer: '홍길동2',
                departName: '부서명2',
                createAt: '2022.10.01',
                baseYear : '2023',
                fromDate:'2023.01.1',
                toDate:'2023.12.31',
                blockGrpName:'블록그룹명04',
                targetBlock:'블록01, 블록02, 블록03',
                status:'I',
                useYN:'Y',
                id:2,
                version: 0,
            });
        },
    }
};

$(function(){
    new Vue(app);
    Vue.nextTick(function() {
        $(window).resize(function() {
            AUIGrid.resize("#resultGrid");
        });
    });
    // Vue.component();
});