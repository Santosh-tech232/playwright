pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test login.spec.js --reporter=html --output=playwright-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**',
                allowEmptyArchive: true
        }
    }
}