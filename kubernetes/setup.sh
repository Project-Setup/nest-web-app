export NAMESPACE=houser-development

# comment/uncomment the lines to enable custom features

# create namespace
# kubectl create namespace $NAMESPACE

# create docker config
# comment this after the first setup
# change the file path as needed
# kubectl create secret generic regcred \
# --from-file=.dockerconfigjson=/home/$USER/.docker/config.json \
# --type=kubernetes.io/dockerconfigjson -n=$NAMESPACE

# create credentials
# comment this after the first setup
# kubectl create secret generic houser-secrets \
# --from-file=secrets -n=$NAMESPACE

# create configmap from env file
# kubectl create configmap houser-env \
# --from-env-file=.env -n=$NAMESPACE

# create persistent volume
# comment this after the first setup
# kubectl create -f kubernetes/mysql-pv.yml -n=$NAMESPACE
# deploy and expose mysql
# kubectl apply -f kubernetes/mysql.yml -n=$NAMESPACE

# deploy nest-web-app
# kubectl apply -f kubernetes/nest-web-app.yml -n=$NAMESPACE

# port-forward for localhost to access service in development
# 
kubectl port-forward deployment/nest-web-app 30080:4000 -n=$NAMESPACE

# ingress expose nest service in prod
# kubectl create -f kubernetes/ingress-nest.yml -n=$NAMESPACE