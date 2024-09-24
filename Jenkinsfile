pipeline {
    agent any

    tools {
        nodejs 'NodeJs 22'
    }

    environment {
        SONARQUBE_ENV = 'Local SonarQube'
        AWS_REGION = 'us-east-1'  // Replace with your region
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')  // AWS Access Key ID stored in Jenkins credentials
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')  // AWS Secret Access Key stored in Jenkins credentials
        APP_NAME = 'my-beanstalk-app'  // Replace with your Elastic Beanstalk app name
        ENV_NAME = 'my-env'  // Replace with your Elastic Beanstalk environment name

    }

    stages {

        // Stage 1: Install Dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        // Stage 2: Build
        stage('Build') {
            steps {
                echo 'Building the TypeScript project...'
                sh 'npm run build'
                sh 'ls -la dist'
                sh 'pwd'
                sh 'chmod -R 777 /var/jenkins_home/workspace/BankingAppPipeline/dist'
            }
        }

//         // Stage 3: Unit Testing
//         stage('Unit Tests') {
//             steps {
//                 echo 'Running unit tests...'
//                 sh 'npm run test:unit'
//             }
//         }
//
//         // Stage 4: Integration Testing
//         stage('Integration Tests') {
//             steps {
//                 echo 'Running integration tests...'
//                 sh 'npm run test:integration'
//             }
//         }
//
//         // Stage 5: Code Quality Analysis
//         stage('Code Quality') {
//             steps {
//                 echo 'Running SonarQube analysis...'
//                 sh 'npm run sonar'
//             }
//         }

        // Stage 6: Deploy
        stage('Deploy') {
            steps {
                script {
                    sh 'ls -la /var/jenkins_home/workspace/BankingAppPipeline/dist'
                    sh 'docker-compose down -v'
                    sh 'docker-compose up --build'
                }
            }
        }
    }

    // Post-build actions (Optional)
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs() // Cleans up the workspace after the build
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
