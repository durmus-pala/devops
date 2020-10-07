# Project 501: Microservices CI/CD Pipeline

## Preparing Microservices Public Project Repository for Students on GitHub

- Fork the petclinic app from the repository [Spring Petclinic Microservices App](https://github.com/spring-petclinic/spring-petclinic-microservices.git)

- Rename the forked repo on your GitHub as `petclinic-microservices`.

- Clone the forked repo from your GitHub repo on your local machine.

```bash
git clone https://github.com/callahan-cw/petclinic-microservices.git
```

- Get the branch info from remote repo.

```bash
git fetch
```

- Make sure everything is pushed up to your remote repository.

```bash
git checkout master
```

- Overwrite `master` with `release/java11` branch.

```bash
git reset --hard release/java11
```

- Force the push to your remote repository:

```bash
git push -f origin master
```

- Delete the branch since it is the `master` now.

```bash
git branch -D release/java11
```

- Update the `<wro4j.version>1.8.0</wro4j.version>` line in pom.xml file with the following line under `spring-petclinic-api-gateway` folder to make it compatible with `Java 11`.

```xml
<wro4j.version>1.9.0</wro4j.version>
```

- Commit the change and push it to the remote `master` branch.

```bash
git add .
git commit -m 'upgraded to wro4j to 1.9.0'
git push origin master
```

## Preparing Microservices Private Project Repository for Teachers on GitHub

- Create the new private repository on GitHub with name `devops-project-microservices-ci-cd-pipeline-with-petclinic-app`.

- Create a bare clone of the repository to be duplicated.

```bash
git clone --bare https://github.com/clarusway/petclinic-microservices.git
```

- Mirror-push to the new private repository.

```bash
cd petclinic-microservices.git/
git push --mirror https://github.com/clarusway/devops-project-microservices-ci-cd-pipeline-with-petclinic-app.git
```

- Remove the temporary local repository you have created.

```bash
cd ..
rm -rf petclinic-microservices.git
```

## Task 1 - Introduction About the Petclinic Application

## Task 2 - Showcase the Petcilinic Application on Demo Server

- Launch Petclinic Demo Server with Docker on Amazon Linux 2 using the `Clarusway` custom AMI within [Clarusway Petclinic App Demo Server Cloudformation Template](./clarusway-petclinic-app-demo-cfn-template.yml). *It takes approximately 4 minutes to get the Demo Server ready*

or

- Launch Petclinic Demo Server with Docker on Amazon Linux 2 using the [Petclinic App Demo Server Cloudformation Template](./petclinic-app-demo-cfn-template.yml). *It takes approximately 12 minutes to get the Demo Server ready*

## MSP 1 - Prepare Development Server on EC2 Instance

- Prepare development server for developers with following script.

```bash
#! /bin/bash
yum update -y
hostnamectl set-hostname petclinic-dev-server
amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user
curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" \
-o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
yum install git -y
yum install java-11-amazon-corretto -y
```

## MSP 2 - Prepare GitHub Repository for the Project

- Fork the petclinic app from the Clarussway repository [Petclinic Microservices Application](https://github.com/clarusway/petclinic-microservices.git)

- Rename the forked repo on your GitHub as `microservices-ci-cd-pipeline-with-petclinic-app`.

- Clone the forked repo from your GitHub repo on dev server.

```bash
git clone https://github.com/clarusway/petclinic-microservices.git
```

- Prepare base branches namely `master`, `dev`, `release` for DevOps cycle.

  - Create `dev` base branch.

    ```bash
    git branch dev
    git checkout dev
    git push --set-upstream origin dev
    ```

  - Create `release` base branch.

    ```bash
    git branch release
    git checkout release
    git push --set-upstream origin release
    ```

## MSP 3 - Checking the Maven Build Setup

- Test the compiled source code.

```bash
./mvnw clean test
```

- Take the compiled code and package it in its distributable `JAR` format.

```bash
./mvnw clean package
```

- Install and build Docker images from the distributable `JAR`s.

```bash
./mvnw clean install -PbuildDocker
```

## MSP 4 - Packaging Application

- Create `feature/msp-4` branch from `dev`.

```bash
git checkout dev
git branch feature/msp-4
git checkout feature/msp-4
```

- Prepare a script to package the application with maven wrapper and save it as `package-with-mvn-wrapper.sh`.

```bash
./mvnw clean package
```

- Commit and push the new script to remote repo.

```bash
git add .
git commit -m 'added packaging script'
git push --set-upstream origin feature/msp-4
```

## MSP 5 - Updating Packagin Script with Version

## MSP 6 - Preparing Dockerfiles for Microservices

## MSP 11 - Preparing Jenkins for Build

- Prepare a Cloudformation template for Jenkins Server with following script.

```bash
#! /bin/bash
yum update -y
hostnamectl set-hostname jenkins-server
yum install git -y
yum install java-11-amazon-corretto -y
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
yum install jenkins -y
systemctl start jenkins
systemctl enable jenkins
amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user
usermod -a -G docker jenkins
cp /lib/systemd/system/docker.service /lib/systemd/system/docker.service.bak
sed -i 's/^ExecStart=.*/ExecStart=\/usr\/bin\/dockerd -H tcp:\/\/127.0.0.1:2375 -H unix:\/\/\/var\/run\/docker.sock/g' /lib/systemd/system/docker.service
systemctl daemon-reload
systemctl restart docker
curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" \
-o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
yum install python3 -y
pip3 install ansible
pip3 install ec2instanceconnectcli
yum install amazon-ecr-credential-helper -y
mkdir -p /home/jenkins/.docker
cd /home/jenkins/.docker
echo '{"credsStore": "ecr-login"}' > config.json
```

- Configure Jenkins Server for Project

plugins
credentials
docker cloud agent


## MSP 12 - Prepare a Jenkinsfile Working on Dev Branch for Unit Tests

- Jenkinsfile...

