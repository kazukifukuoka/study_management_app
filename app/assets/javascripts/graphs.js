document.addEventListener('turbolinks:load', () => {
  // '2020-01-12'のような文字列から，Javascriptの日付オブジェクトを取得する関数
  // setHoursを使用しないと，時差の影響で0時にならないため注意！
  const convertDate = (date) => new Date(new Date(date).setHours(0, 0, 0, 0))

  const TODAY = convertDate(new Date())
  const A_WEEK_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 6)
  const TWO_WEEKS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 13)
  const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate() + 1)
  const THREE_MONTHS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 3, TODAY.getDate() + 1)

  // グラフを描く場所を取得
  const chartStudyTimeContext = document.getElementById("chart-study-time").getContext('2d')

  // 期間を指定してグラフを描く
  const drawGraph = (from, to) => {
      // from から to までの期間のデータに絞る
      let records = gon.user_records.filter((record) => {
          let date = convertDate(record.date)
          return from <= date && date <= to
      })

      // 日付のみのデータを作成
      let dates = records.map((record) => {
          // 横軸のラベル表示は簡潔にしたいので，
          // 日付 2020-01-08 を 1/8 のような形式に変換する
          return record.date.replace(/^\d+-0*(\d+)-0*(\d+)$/, '$1/$2')
      })

      // 体重のみのデータを作成
      let study_time = records.map((record) => record.study_time)

      let studyTimeData = {
          labels: dates,
          datasets: [{
              label: '学習時間(分)',
              data: study_time,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              spanGaps: true
          }]
      }

      let StudyTimeOption = {
          tooltips: {
              callbacks: {
                  // ホバー（スマホならタップ）時のラベル表示を変更
                  title: function (tooltipItems) {
                      return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
                  },
                  label: function (tooltipItem) {
                      return '学習時間: ' + tooltipItem.yLabel + '分'
                  }
              }
          }
      }

      new Chart(chartStudyTimeContext, {
          type: 'line',
          data: studyTimeData,
          options: StudyTimeOption
      })
  }

  // グラフの初期表示
  drawGraph(A_WEEK_AGO, TODAY)
})