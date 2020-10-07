# Fork the petclinic app from the repository https://github.com/spring-petclinic/spring-petclinic-microservices.git
# Rename the forked repo on your GitHub as petclinic-microservices
# Clone the forked repo from your GitHub repo
git clone https://github.com/callahan-cw/petclinic-microservices.git

# git branch info from remote repo
git fetch

# Make sure everything is pushed up to your remote repository (GitHub):
git checkout master

# Overwrite "master" with "better_branch":
git reset --hard release/java11

# Force the push to your remote repository:
git push -f origin master

# Delete branch 
git branch -D release/java11

# update following line in pom.xml file under spring-petclinic-api-gateway
# <wro4j.version>1.9.0</wro4j.version>
# commit the change to the master branch