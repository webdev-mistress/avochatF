pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building..'
        sh 'ls -a'
        sh 'node -v'
        sh 'pwd'
        sh 'npm install';
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying...'
        sh 'cp -r build/* /var/www/chat.d.ledev.ru/front/'
      }
    }
  }
}
