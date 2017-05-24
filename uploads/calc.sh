echo  1.summation
echo 2.sub
echo 3.mul
echo 4.div
echo enter ur choice
read ch
echo enter 2 nos.
read n1
read n2


case "$ch" in
	1)ans=`expr $n1 + $n2`
	echo $ans ;;
	2)ans=`expr $n1 - $n2`
	echo $ans ;; 
	3)ans=`expr $n1 \* $n2`
	echo $ans ;; 
	4)ans=`expr $n1 / $n2`
	echo $ans ;;
	0)echo exit ;;
	*)echo invalid 
esac

