# テストユーザー情報
EMAIL = 'test@example.com'
PASSWORD = 'password'

# データの入力範囲
START_DATE = Date.today - 11.months
END_DATE = Date.today + 1.months

# 1/(NO_RECORD_CONSTANT) の確率でデータを記録しない
# （記録が一部欠けていてもグラフが正常に描けるかをチェックするため）
NO_RECORD_CONSTANT = 5

# 記録する体重の範囲（乱数で値を決める都合上，10倍しておく）
MIN_STUDY_TIME = 30
MAX_STUDY_TIME = 180
MIN_SCORE = 30
MAX_SCORE = 100
user = User.find_or_create_by!(email: EMAIL) do |user|
  user.password = PASSWORD
  puts 'テストユーザーの初期データインポートに成功しました。'
end

user.graphs.destroy_all
graphs = []
(START_DATE..END_DATE).each do |date|
  # 1/(NO_RECORD_CONSTANT) の確率でデータを入れる操作をスキップ
  next if rand(NO_RECORD_CONSTANT).zero?
graphs << {
    user_id: user.id,
    date: date,
    # to_f を入れておかないと整数になるので注意！
    study_time: rand(MIN_STUDY_TIME..MAX_STUDY_TIME),
    score: rand(MIN_SCORE..MAX_SCORE),
    subject: ["国語", "数学", "理科", "社会", "英語"]
  }
end
Graph.create!(graphs)
puts '初期データ投入に成功しました！'