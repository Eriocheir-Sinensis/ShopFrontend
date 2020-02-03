pipeline {
  agent {
    docker { image 'node:lts' }
  }
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh 'npm build'
      }
    }

  }
}
