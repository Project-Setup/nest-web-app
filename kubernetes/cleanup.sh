# change the env var as needed
export NAMESPACE=houser-development

# comment/uncomment the lines to enable custom features

# delete secrets
kubectl delete secrets regcred -n=$NAMESPACE
kubectl delete secrets houser-secrets -n=$NAMESPACE

# delete configmaps
kubectl delete configmap houser-env -n=$NAMESPACE

# delete ingress in prod
kubectl delete ingress ingress-nest -n=$NAMESPACE

# delete service and deployment of nest-web-app
# kubectl delete service nest-web-app -n=$NAMESPACE
kubectl delete deployment nest-web-app -n=$NAMESPACE

# delete service and deployment of mysql
kubectl delete service mysql -n=$NAMESPACE
kubectl delete deployment mysql -n=$NAMESPACE

# delete persistent volume
kubectl delete persistentvolumeclaims mysql-pv-claim -n=$NAMESPACE
kubectl delete persistentvolume mysql-pv-volume -n=$NAMESPACE
kubectl delete storageclasses fast -n=$NAMESPACE

# delete namespace
kubectl delete namespace $NAMESPACE