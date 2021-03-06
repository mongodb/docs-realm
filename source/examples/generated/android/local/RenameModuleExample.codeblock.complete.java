import io.realm.annotations.RealmModule;
import io.realm.annotations.RealmNamingPolicy;

@RealmModule(
        allClasses = true,
        classNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES,
        fieldNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES
)
public class MyModule {
}
