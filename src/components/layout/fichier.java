

public abstract class ModelsController extends Controller {

    public Result index(Http.Request request){
       // code 
    }
    public Result create(Http.Request request){
       // code 
    }
    public Result show(Http.Request request, Long objectId){
       // code 
    }
    public Result update(Http.Request request, Long objectId){
       // code 
    }
    public Result delete(Http.Request request, Long objectId){
       // code 
    }
} 


@Entity
@Builder
public class User extends Standard {

} 


public abstract class StandardRepository<T extends Standard> {

    // renvoie la liste de tous les objets T
    public List<T> findAll(){
        // code
    }
    
    // renvoie l’objet T à ID spécifique 
    public T find(Long id){
        // code
    }
    
    // renvoie un objet T selon les conditions spécifiques
    public T findByOne(String[] conditions){
        // code
    }
    
    // renvoie une liste d’objet T selon les conditions 
    public List<T> findBy(String[] conditions){
        // code
    }
    
}



@Singleton
public class UserRepository extends StandardRepository<User> {

} 
    
  
public abstract class ModelsController extends Controller {
    public abstract StandardRepository getRepository();
}


public class UsersController extends ModelsController {
    // injection de répository
    @Inject private UserRepository userRepository;
 
    @Override
    public StandardRepository getRepository() {
        return this.userRepository;
    }
 }


<VirtualHost *:80>
ProxPreserveHost pn
ProxyPass /http://192.168.1.4:9000/
ProxyPassReverse / http://192.168.1.4:9000
</VirtualHost>


<Proxy balancer://prodcluster>
BalancerMember http://192.168.1.4:9000
BalancerMember http://192.168.1.5:9000
</Proxy>

<VirtualHost *:80>
ProxPreserveHost pn
ProxyPass /balancer://prodcluster/
ProxyPassReverse / balancer://prodcluster/
</VirtualHost>

apt-get install nginx


http{

    proxy_buffering off ;
    
    proxy_set_header X-Real-IP $remote_addr ;
    
    proxy_set_header X-Scheme $scheme ;
    
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for ;
    
    proxy_set_header Host $http_host ;
    
    upstream mon-backend {
    
    serveur 127.0.0.1:9000 ;
    
    }
    
    serveur {
    
    nom_serveur www.yourserverdomainname.com ;
    
    }
    
    serveur {
    
    keepalive_timeout 70 ;
    
    nom_serveur www.yourserverdomainname.com ;
    
    location / {
    
    proxy_pass http://my-backend ;
    
    }
}
} 

