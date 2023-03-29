doit(){
total_count="$(wc -l < "./imgs.txt")";    
current_count=1;
spin='←↖↑↗→↘↓↙'
i=0;
tput civis
while read F; do
    echo "Checking" $F "("$current_count "of" $total_count "image files)";
    for f in $(find ~/Projects/mongocaleb/docs-realm/source -type f); do 
    {
        #echo $f
        if n=$(grep -q $F $f); then
            echo "→→→ "Image found in $f;
            printf $F,$f"\n" >> results.csv;
        fi
    }
    i=$(( (i+1) %8 ));
    printf "\r${spin:$i:1}"
    done
    printf "\r✔\n"
    ((current_count = current_count+1));
done <./imgs.txt
}
doit
echo "done."
tput cnorm