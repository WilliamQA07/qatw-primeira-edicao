pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('Node.js Dpes') {
            steps {
                sh 'npm install'
            }
        }
        stage('Testes E2E') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
