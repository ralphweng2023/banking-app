pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the TypeScript project...'
                sh 'npm run build'
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'npm run test:unit'
            }
        }

        stage('Integration Tests') {
            steps {
                echo 'Running integration tests...'
                sh 'npm run test:integration'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube_Server') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
